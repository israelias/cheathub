import React from 'react';
import { HTMLChakraProps, chakra } from '@chakra-ui/react';

import { motion, HTMLMotionProps } from 'framer-motion';

type Merge<P, T> = Omit<P, keyof T> & T;

type MotionBoxProps = Merge<
  HTMLChakraProps<'div'>,
  HTMLMotionProps<'div'>
>;

export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

type MotionInputProps = Merge<
  HTMLChakraProps<'input'>,
  HTMLMotionProps<'input'>
>;
export const MotionInput: React.FC<MotionInputProps> = motion(
  chakra.input
);

type MotionFormProps = Merge<
  HTMLChakraProps<'form'>,
  HTMLMotionProps<'form'>
>;

export const MotionForm: React.FC<MotionFormProps> = motion(
  chakra.form
);

type MotionSelectProps = Merge<
  HTMLChakraProps<'select'>,
  HTMLMotionProps<'select'>
>;

export const MotionSelect: React.FC<MotionSelectProps> = motion(
  chakra.select
);

type MotionButtonProps = Merge<
  HTMLChakraProps<'button'>,
  HTMLMotionProps<'button'>
>;

export const MotionButton: React.FC<MotionButtonProps> = motion(
  chakra.button
);

type MotionArticleProps = Merge<
  HTMLChakraProps<'article'>,
  HTMLMotionProps<'article'>
>;

export const MotionArticle: React.FC<MotionArticleProps> = motion(
  chakra.article
);

type MotionSectionProps = Merge<
  HTMLChakraProps<'section'>,
  HTMLMotionProps<'section'>
>;

export const MotionSection: React.FC<MotionSectionProps> = motion(
  chakra.section
);

type MotionHeaderProps = Merge<
  HTMLChakraProps<'header'>,
  HTMLMotionProps<'header'>
>;

export const MotionHeader: React.FC<MotionHeaderProps> = motion(
  chakra.header
);

type MotionFooterProps = Merge<
  HTMLChakraProps<'footer'>,
  HTMLMotionProps<'footer'>
>;

export const MotionFooter: React.FC<MotionFooterProps> = motion(
  chakra.footer
);

type MotionAsideProps = Merge<
  HTMLChakraProps<'aside'>,
  HTMLMotionProps<'aside'>
>;

export const MotionAside: React.FC<MotionAsideProps> = motion(
  chakra.aside
);

type MotionPProps = Merge<HTMLChakraProps<'p'>, HTMLMotionProps<'p'>>;

export const MotionP: React.FC<MotionPProps> = motion(chakra.p);

type MotionUlProps = Merge<
  HTMLChakraProps<'ul'>,
  HTMLMotionProps<'ul'>
>;

export const MotionUl: React.FC<MotionUlProps> = motion(chakra.ul);

type MotionLiProps = Merge<
  HTMLChakraProps<'li'>,
  HTMLMotionProps<'li'>
>;

export const MotionLi: React.FC<MotionLiProps> = motion(chakra.li);
