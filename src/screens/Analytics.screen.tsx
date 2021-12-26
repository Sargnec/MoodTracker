import { groupBy } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { useAppSelector } from '../hooks';
import { VictoryPie } from 'victory-native';
import { theme } from '../theme';
export const Analytics: React.FC = () => {
  const history = useAppSelector(state => state.history.value);

  const data = Object.entries(groupBy(history, 'mood.emoji')).map(
    ([key, value]) => ({
      x: key,
      y: value.length,
    }),
  );
  return (
    <View>
      <VictoryPie
        data={data}
        labelRadius={80}
        radius={150}
        innerRadius={50}
        colorScale={[
          theme.colorPurple,
          theme.colorLavender,
          theme.colorBlue,
          theme.colorGrey,
          theme.colorWhite,
        ]}
        style={{ labels: { fontSize: 30 } }}
      />
    </View>
  );
};
