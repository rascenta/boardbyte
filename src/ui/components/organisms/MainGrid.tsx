import { SettingOutputIcon } from 'assets/icons/Icons';
import { useState } from 'react';
import styled from 'styled-components';
import { Column } from '../atoms/Column';
import { Row } from '../atoms/Row';
import { BreadCrumb } from '../molecules/BreadCrumb';
import { DropdownSelect, SelectOption } from '../molecules/DropdownSelect';
import { MySwitch } from '../molecules/MySwitch';
import { NewRecordButton } from '../molecules/NewRecordButton';
import { ISoundItem, SoundItem } from '../molecules/SoundItem';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 24px 56px;

  margin: 40px 77px;
`;

const MainGridAction = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 24px 42px 32px 42px;
`;

const TopSetting = styled(Row)`
  padding: 32px 0px;
  width: 100%;
  border-bottom: 1px solid #494d54;

  display: flex;
  justify-content: space-between;
`;

type MainGridProps = {
  sounds: ISoundItem[];
  outputs?: MediaDeviceInfo[];
  onSelected(sound?: ISoundItem): any;
  selectedSound?: ISoundItem;
};

export const MainGrid: React.FC<MainGridProps> = ({
  sounds,
  outputs,
  onSelected,
  selectedSound,
}) => {
  const [checked, setChecked] = useState(false);

  const [selectedPrimaryOutput, setSelectedPrimaryOutput] =
    useState<SelectOption>({ label: 'Default Ouput', deviceId: 'default' });
  const [selectedSecondaryOutput, setSelectedSecondaryOutput] =
    useState<SelectOption>({ label: 'Default Output', deviceId: 'default' });

  const handleCheck = () => {
    setChecked((c) => !c);
  };

  const handlePrimaryOutputChange = (value: SelectOption) => {
    setSelectedPrimaryOutput(value);
    localStorage.setItem('primary_output', value.deviceId);
  };

  const handleSecondaryOutputChange = (value: SelectOption) => {
    setSelectedSecondaryOutput(value);
    localStorage.setItem('secondary_output', value.deviceId);
  };

  return (
    <Column style={{ width: '76%' }}>
      <TopSetting>
        <Row style={{ gap: 16, paddingLeft: 42 }}>
          <SettingOutputIcon />
          <DropdownSelect
            selectedValue={selectedPrimaryOutput}
            onChange={handlePrimaryOutputChange}
            options={outputs}
          />
          <DropdownSelect
            selectedValue={selectedSecondaryOutput}
            onChange={handleSecondaryOutputChange}
            options={outputs}
          />
        </Row>
        <Row style={{ paddingRight: 42 }}>
          <MySwitch isChecked={checked} onChecked={handleCheck} />
        </Row>
      </TopSetting>

      <MainGridAction>
        <BreadCrumb />
        <NewRecordButton />
      </MainGridAction>

      <GridContainer>
        {sounds.map((sound, index) => (
          <SoundItem
            key={index}
            outputs={[
              selectedPrimaryOutput.deviceId,
              selectedSecondaryOutput.deviceId,
            ]}
            sound={sound}
            onSelected={onSelected}
            isSelected={sound.source === selectedSound?.source}
          />
        ))}
      </GridContainer>
    </Column>
  );
};
