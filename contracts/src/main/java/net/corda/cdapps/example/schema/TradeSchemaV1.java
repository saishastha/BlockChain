package net.corda.cdapps.example.schema;

import net.corda.core.schemas.MappedSchema;
import net.corda.core.schemas.PersistentState;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Arrays;
import java.util.UUID;
import java.time.LocalDateTime;
//4.6 changes
import org.hibernate.annotations.Type;
import javax.annotation.Nullable;

/**
 * An TradeState schema.
 */
public class TradeSchemaV1 extends MappedSchema {
    public TradeSchemaV1() {
        super(TradeSchema.class, 1, Arrays.asList(PersistentTrade.class));
    }

    @Nullable
    @Override
    public String getMigrationResource() {
        return "iou.changelog-master";
    }

    @Entity
    @Table(name = "Trade_states")
    public static class PersistentTrade extends PersistentState {
        @Column(name = "TradeId") private final String TradeId;
        @Column(name = "FromParty") private final String FromParty;
        @Column(name = "ToParty") private final String ToParty;
        @Column(name = "Amount") private final int Amount;
        @Column(name = "TradeDate") private final LocalDateTime TradeDate;
        @Column(name = "Status") private final String Status;
        @Column(name = "linear_id") @Type (type = "uuid-char") private final UUID linearId;


        public PersistentTrade(String TradeId, String FromParty, String ToParty,int Amount,
                             LocalDateTime TradeDate,
                             String Status, UUID linearId) {
            this.TradeId = TradeId;
            this.FromParty = FromParty;
            this.ToParty = ToParty;
            this.Amount=Amount;
            this.TradeDate=TradeDate;
            this.Status=Status;
            this.linearId = linearId;
        }

        // Default constructor required by hibernate.
        public PersistentTrade() {
            this.TradeId = null;
            this.FromParty = null;
            this.ToParty = null;
            this.Amount = 0;
            this.TradeDate=null;
            this.Status=null;
            this.linearId = null;
        }

        public String getTradeId() {
            return TradeId;
        }

        public String getFromParty() {
            return FromParty;
        }

        public String getToParty() {
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

        public UUID getId() {
            return linearId;
        }
    }
}