import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import SvgIcon from './Svg';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({visible, onClose, title, children}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          {/* Close Icon Top-Right */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <SvgIcon name="close" width={24} height={24} strokeColor="red" />
          </TouchableOpacity>

          {/* Title */}
          {title ? <Text style={styles.title}>{title}</Text> : null}

          {/* Content */}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

interface Styles {
  overlay: ViewStyle;
  popupContainer: ViewStyle;
  title: TextStyle;
  content: ViewStyle;
  closeButton: ViewStyle;
  closeButtonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop:5
  },
  content: {
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
    zIndex: 1,
  },
});
