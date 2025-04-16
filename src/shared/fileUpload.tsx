import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
  types as DocumentPickerTypes,
} from 'react-native-document-picker';
import SvgIcon from './Svg';
import {AppColors} from '../constants/colors.config';

interface PDFUploaderProps {
  onFileSelect: (file: any) => void;
  label?: string;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({onFileSelect, label}) => {
  const handlePick = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });

      if (res) {
        onFileSelect(res);
      }
    } catch (err: any) {
      if (!DocumentPicker.isCancel(err)) {
        console.warn('File picking error:', err);
      }
    }
  };

  return (
    <TouchableOpacity style={styles.uploadBox} onPress={handlePick}>
      <SvgIcon
        name="upload"
        height={24}
        width={24}
        strokeColor={AppColors.headerBackground}
      />
      <Text style={styles.uploadText}>{label || 'Upload PDF'} </Text>
    </TouchableOpacity>
  );
};

export default PDFUploader;

const styles = StyleSheet.create({
  uploadBox: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    marginTop: 10,
  },
  uploadText: {
    color: AppColors.headerBackground,
    fontSize: 14,
    fontWeight: 600,
  },
});
