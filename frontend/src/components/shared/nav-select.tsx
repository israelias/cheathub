import * as React from 'react';
import { useState } from 'react';
import {
  MenuButton,
  Menu,
  Button,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  Flex,
} from '@chakra-ui/react';
import { ArrowUpDownIcon, CheckIcon } from '@chakra-ui/icons';
import * as faker from 'faker';

export type OptionProps = {
  id: string;
  label: React.ReactNode;
  render?: (props: {
    isSelected: boolean;
    label: OptionProps['label'];
    option: OptionProps;
  }) => React.ReactNode;
};

const fixtures: OptionProps[] = Array.from(
  { length: 15 },
  (_, index) => {
    const src = faker.image.image();
    const name = faker.name.findName();
    return {
      id: String(index),
      label: faker.internet.domainName(),
      render: ({ label }) => (
        <>
          <Avatar boxSize="2rem" src={src} name={name} mr="4" />
          <Text textAlign="left">{label}</Text>
        </>
      ),
    };
  }
);

export default function Select({
  options = fixtures,
}: {
  options: OptionProps[];
}) {
  const [selected, setSelected] = useState<OptionProps | null>(null);

  const buttonText = selected ? (
    selected?.render?.({
      isSelected: true,
      label: selected.label,
      option: selected,
    })
  ) : (
    <span>Please select</span>
  );

  const width = 'xl';

  return (
    <Menu>
      <MenuButton
        as={Button}
        maxW={width}
        w="full"
        overflow="hidden"
        textAlign="left"
        rightIcon={<ArrowUpDownIcon />}
      >
        <Flex align="center">{buttonText}</Flex>
      </MenuButton>
      <MenuList maxW={width} maxH="sm" overflow="auto" w="100vw">
        {options.map((item) => {
          const isSelected = item.id === selected?.id;
          return (
            <MenuItem
              key={item.id}
              minH="40px"
              onClick={() => setSelected(item)}
            >
              {item.render?.({
                isSelected,
                label: item.label,
                option: item,
              }) ?? item.label}
              {isSelected && <CheckIcon ml="auto" />}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
