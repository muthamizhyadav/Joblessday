import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {AppColors} from '../constants/colors.config';
import SvgIcon from './Svg';

interface KeySkillsInputProps {
  onSkillsChange?: (skills: string[]) => void;
  style?:any
}

const KeySkillsInput: React.FC<KeySkillsInputProps> = ({onSkillsChange,style}) => {
  const [input, setInput] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);

  const handleAddSkill = () => {
    if (input.trim() !== '') {
      const newSkills = input
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);
      const updatedSkills = [...skills, ...newSkills];
      setSkills(prev => [...prev, ...newSkills]);
      setInput('');
      onSkillsChange?.(updatedSkills);
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    onSkillsChange?.(updatedSkills);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
         style={[styles.input, style]}
          placeholder="Enter key skill"
          value={input}
          onChangeText={setInput}
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity onPress={handleAddSkill} style={styles.addbtn}>
          <Text style={{color: 'white', fontSize: 16}}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <TouchableOpacity
            key={index}
            style={styles.skillTag}
            onPress={() => handleRemoveSkill(index)}>
            <Text style={styles.skillText}>{skill} </Text>
            <SvgIcon name="close" width={14} height={14} strokeColor="red" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default KeySkillsInput;

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
  inputRow: {
    position: 'relative',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: 'white',
    width: '100%',
    marginTop: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skillTag: {
    backgroundColor: AppColors.headerBackground,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  skillText: {
    color: 'white',
  },
  addbtn: {
    position: 'absolute',
    bottom: 6,
    right: 5,
    backgroundColor: AppColors.headerBackground,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
