package net.corda.cdapps.example.states;

import net.corda.cdapps.example.schema.TradeSchemaV1;
import net.corda.cdapps.example.contracts.TradeContract;
import net.corda.core.contracts.BelongsToContract;
import net.corda.core.contracts.LinearState;
import net.corda.core.contracts.UniqueIdentifier;
import net.corda.core.identity.AbstractParty;
import net.corda.core.identity.Party;
import net.corda.core.schemas.MappedSchema;
import net.corda.core.schemas.PersistentState;
import net.corda.core.schemas.QueryableState;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

/**
 * The states object recording IOU agreements between two parties.
 *
 * A states must implement [ContractState] or one of its descendants.
 */
@BelongsToContract(TradeContract.class)
public class TradeState implements LinearState, QueryableState {
    private final String TradeId;
    private final Party FromParty;
    private final Party ToParty;
    private final int Amount;
    private final LocalDateTime TradeDate;
    private final String Status;
    private final UniqueIdentifier linearId;


    public TradeState(String TradeId,Party FromParty,Party ToParty,
            int Amount, LocalDateTime TradeDate,String Status, UniqueIdentifier linearId)
    {
        this.TradeId = TradeId;
        this.FromParty = FromParty;
        this.ToParty = ToParty;
        this.Amount=Amount;
        this.TradeDate=TradeDate;
        this.Status=Status;
        this.linearId = linearId;
    }

    public String getTradeId() {
        return TradeId;
    }

    public Party getFromParty() {
        return FromParty;
    }

    public Party getToParty() {
        return ToParty;
    }

    public int getAmount() {
        return Amount;
    }

    public LocalDateTime getTradeDate() {
        return TradeDate;
    }

    public String getStatus() {
        return Status;
    }

    @Override public UniqueIdentifier getLinearId() { return linearId; }
    @Override public List<AbstractParty> getParticipants() {
        return Arrays.asList(FromParty, ToParty);
    }

    @Override public PersistentState generateMappedObject(MappedSchema schema) {
        if (schema instanceof TradeSchemaV1) {
            return new TradeSchemaV1.PersistentTrade(
                    this.TradeId,
                    this.FromParty.getName().toString(),
                    this.ToParty.getName().toString(),
                    this.Amount,
                    this.TradeDate,
                    this.Status,
                    this.linearId.getId());
        } else {
            throw new IllegalArgumentException("Unrecognised schema $schema");
        }
    }

    @Override public Iterable<MappedSchema> supportedSchemas() {
        return Arrays.asList(new TradeSchemaV1());
    }

    @Override
    public String toString() {
        return String.format("TradeState(value=%s, lender=%s, borrower=%s, linearId=%s)", TradeId, FromParty, ToParty, linearId);
    }
}