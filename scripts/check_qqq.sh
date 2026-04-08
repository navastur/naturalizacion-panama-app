#!/bin/bash

# QQQ Monitoring Script
SYMBOL="QQQ"
THRESHOLD=-1.5
USER_AGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
URL="https://query1.finance.yahoo.com/v8/finance/chart/$SYMBOL?interval=1d&range=1d"

# Fetch data
DATA=$(curl -s -H "User-Agent: $USER_AGENT" "$URL")
CURRENT_PRICE=$(echo "$DATA" | jq -r '.chart.result[0].meta.regularMarketPrice')
PREVIOUS_CLOSE=$(echo "$DATA" | jq -r '.chart.result[0].meta.chartPreviousClose')

# Calculate percentage change
CHANGE=$(echo "scale=4; ($CURRENT_PRICE - $PREVIOUS_CLOSE) / $PREVIOUS_CLOSE * 100" | bc)

# Check threshold
IS_DROP=$(echo "$CHANGE <= $THRESHOLD" | bc -l)

if [ "$IS_DROP" -eq 1 ]; then
    echo "ALERTA: QQQ ha bajado un $CHANGE%. Precio actual: \$$CURRENT_PRICE (Cierre previo: \$$PREVIOUS_CLOSE)."
else
    # Silent if no drop, as per user request "avísame solo si baja un 1.5%"
    exit 0
fi
