import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { AppColors } from '../../constants/colors.config';
import SvgIcon from '../../shared/Svg';
import * as Animatable from 'react-native-animatable';

interface ResumeActionsProps {
  onDownloadResume: () => void;
  onShareResume: () => void;
  onEditProfile: () => void;
  candidateName: string;
}

const ResumeActions: React.FC<ResumeActionsProps> = ({
  onDownloadResume,
  onShareResume,
  onEditProfile,
  candidateName
}) => {

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out ${candidateName}'s professional profile and resume on JoblessDay!`,
        title: `${candidateName} - Professional Profile`,
      });
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  return (
    <Animatable.View animation="slideInUp" duration={600} style={styles.container}>
      <Text style={styles.title}>Resume Actions</Text>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.downloadButton]} 
          onPress={onDownloadResume}
        >
          <SvgIcon name="download" strokeColor="#fff" width={20} height={20} />
          <Text style={styles.actionButtonText}>Download PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.shareButton]} 
          onPress={handleShare}
        >
          <SvgIcon name="redirect" strokeColor="#fff" width={20} height={20} />
          <Text style={styles.actionButtonText}>Share Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={onEditProfile}
        >
          <SvgIcon name="edit" strokeColor="#fff" width={20} height={20} />
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Profile Score</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>95%</Text>
          <Text style={styles.statLabel}>Complete</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Views</Text>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  downloadButton: {
    backgroundColor: AppColors.AppButtonBackground,
  },
  shareButton: {
    backgroundColor: '#4CAF50',
  },
  editButton: {
    backgroundColor: '#FF9800',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.AppButtonBackground,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#ddd',
  },
});

export default ResumeActions;
