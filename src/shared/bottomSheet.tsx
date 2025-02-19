import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {BottomSheet} from 'react-native-sheet';

interface BottomProps {
  setOpen: (value: boolean) => void;
  open: boolean;
  customComponent: React.ReactNode;
}

const SharedBottomSheet: React.FC<BottomProps> = ({
  setOpen,
  open,
  customComponent,
}) => {
  console.log('BottomSheet Open:', open);

  return (
    <BottomSheet height={400} onOpenStart={() => setOpen} openTime={1000}>
      <View>
        <Text>Drawer content</Text>
        <Button title="Close" />
        {customComponent}
      </View>
    </BottomSheet>
  );
};

export default SharedBottomSheet;
