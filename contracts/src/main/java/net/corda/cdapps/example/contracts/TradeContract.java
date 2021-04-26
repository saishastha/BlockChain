package net.corda.cdapps.example.contracts;

import net.corda.cdapps.example.states.TradeState;
import net.corda.core.contracts.CommandData;
import net.corda.core.contracts.CommandWithParties;
import net.corda.core.contracts.Contract;
import net.corda.core.identity.AbstractParty;
import net.corda.core.transactions.LedgerTransaction;

import java.util.stream.Collectors;

import static net.corda.core.contracts.ContractsDSL.requireSingleCommand;
import static net.corda.core.contracts.ContractsDSL.requireThat;

/**
 * A implementation of a basic smart contracts in Corda.
 *
 * This contracts enforces rules regarding the creation of a valid [TradeState], which in turn encapsulates an [IOU].
 *
 * For a new [Trade] to be issued onto the ledger, a transaction is required which takes:
 * - Zero input states.
 * - One output states: the new [Trade].
 * - An Create() command with the public keys of both the lender and the borrower.
 *
 * All contracts must sub-class the [Contract] interface.
 */
public class TradeContract implements Contract {
    public static final String ID = "net.corda.cdapps.example.contracts.TradeContract";

    /**
     * The verify() function of all the states' contracts must not throw an exception for a transaction to be
     * considered valid.
     */
    @Override
    public void verify(LedgerTransaction tx) {
        final CommandWithParties<Commands.Create> command = requireSingleCommand(tx.getCommands(), Commands.Create.class);
        requireThat(require -> {
            // Generic constraints around the Trade transaction.
            require.using("No inputs should be consumed when issuing an Trade.",
                    tx.getInputs().isEmpty());
            require.using("Only one output states should be created.",
                    tx.getOutputs().size() == 1);
            final TradeState out = tx.outputsOfType(TradeState.class).get(0);
            require.using("The FromParty and the ToParty cannot be the same entity.",
                    !out.getFromParty().equals(out.getToParty()));
            require.using("All of the participants must be signers.",
                    command.getSigners().containsAll(out.getParticipants().stream().map(AbstractParty::getOwningKey).collect(Collectors.toList())));

            // Trade-specific constraints.
            require.using("The Trade's Amount must be non-negative.",
                    out.getAmount() > 0);

            return null;
        });
    }

    /**
     * This contracts only implements one command, Create.
     */
    public interface Commands extends CommandData {
        class Create implements Commands {}
    }
}