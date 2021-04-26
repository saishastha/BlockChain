package net.corda.cdapps.example.contracts;

import net.corda.cdapps.example.states.TradeState;
import net.corda.testing.node.MockServices;
import org.junit.Test;

public class StateTests {
    private final MockServices ledgerServices = new MockServices();

    @Test
    public void hasAmountFieldOfCorrectType() throws NoSuchFieldException {
        // Does the message field exist?
        TradeState.class.getDeclaredField("value");
        // Is the message field of the correct type?
        assert(TradeState.class.getDeclaredField("value").getType().equals(Integer.class));
    }
}