backupExtension=".bak"
[[ $(uname) == 'Linux' ]] && backupExtension=""

sed -i $backupExtension \
    's/onPress={onPress}/onPressIn={onPress}/g' \
    node_modules/react-native-chart-kit/dist/line-chart/LineChart.js

echo "Patched react-native-chart-kit LineChart.js"
