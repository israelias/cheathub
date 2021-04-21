/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { FiPlus, FiMinus } from 'react-icons/fi';
import { NavLink } from '../../shared/link';
import { Viewer } from '../../editor/viewer';

export const CodeCardItem = styled(motion.div)`
  border-radius: 16px;
  border: 1px solid #ceccca;
  background-color: #f5f0ee;
  width: fit-content;
  padding: 24px 24px 48px 24px;
  display: grid;
  grid-template-columns: repeat(3, 64px);
  grid-row-gap: 32px;
  grid-column-gap: 16px;
`;

export const View = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
  grid-column-gap: 2rem;
  max-width: 1440px;
  margin: auto;
  overflow-y: auto;
  height: 100%;

  /* margin: 0px; // body */
  & > * {
    /* font-family: Apercu, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    	font-weight: 400;
    	line-height: 1.5;
    	color: rgb(16, 22, 47);
    	text-align: left;
    	background-color: rgb(255, 255, 255); */
  }
`;

export const SideNav = styled.div`
  position: fixed;
  top: 8rem;
  padding-left: 1.5rem;
  grid-row: 1;
  grid-row-start: 1;
  grid-row-end: auto;
  display: none;

  border-right: 1px solid red;
  @media only screen and (min-width: 64rem) {
    display: block;
  }

  a {
    display: block;
    color: #fff;
    background-color: initial;
    text-align: left;
    display: block !important;
    padding: 0.5rem;
    margin-left: -0.5rem;
    align-items: center;
    text-decoration: none;
    white-space: nowrap;
    /* vertical-align: middle; */
    cursor: pointer;
    font-family: inherit;

    justify-content: center;
    font-weight: 700;

    border: 1px solid transparent;
    border-radius: 2px;

    user-select: none;

    font-size: 1rem;
    line-height: 1.5;
    min-width: 8rem;
  }

  p {
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
  }
`;

export const Container = styled.div`
  /* width: fit-content; */
  /* align-self: center; */
  /* justify-self: center; */
  margin-top: 8rem;
  padding: 0 2rem 20rem;
  grid-column: 1/-1;
  grid-row: 1/-1;
  opacity: 1;

  @media only screen and (min-width: 64rem) {
    margin-top: 4rem;
    grid-column: 2/3;
    grid-row: 1/-1;
  }
`;

export const Card = styled.div`
  /* border-radius: 16px; */
  border: 1px solid #ceccca;
  background-color: #f5f0ee;
  /* background-color: #fff; */
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  padding-top: 1.5rem;
  padding-bottom: 1.875rem;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);

  /* active review card */
  opacity: 1;
  transition: all 0.1s ease 0s;

  @media only screen and (min-width: 64rem) {
    margin-top: 4rem;
    grid-column: 2/3;
    grid-row: 1/-1;
  }
`;

export const Display = styled.pre`
  /* grid-column: span 3; */
  /* grid-row: span 3; */
  margin: 0;
  height: 100%;
  border-radius: 0;
  /* padding: 16px; */
  background-color: #a5a486;
  color: #1f2326;
  border: 1px inset #ceccca;

  div {
    display: block;
    text-align: left;
    font-weight: normal;
    /* background-color: rgb(33, 30, 47); */
    /* color: rgb(147, 149, 152); */
    font-family: Monaco, Menlo, 'Ubuntu Mono', 'Droid Sans Mono',
      Consolas, monospace;
    font-size: 0.875rem;
    padding: 1rem;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    -webkit-font-smoothing: antialiased;
  }
`;

export const Label = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  padding: 4px 0px 0px 4px;
  /* font-size: 18px; */
  font-weight: 800;
`;

export const Heading = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  font-family: Apercu, -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
  color: #000;

  padding: 0 1.3rem;
  margin-bottom: 1.125rem;

  p {
    margin-bottom: 0;
    margin-top: 0;
    line-height: 1.6;
    /* word-wrap: break-word; */
    overflow-wrap: break-word;
    word-break: break-word;

    /* font-family: Apercu, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; */
    /* font-weight: 400; */
    /* line-height: 1.5; */
    /* color: rgb(16, 22, 47); */
    text-align: left;
    /* background-color: rgb(255, 255, 255); */
  }
`;

export const Description = styled.div`
  padding: 0 1.3rem;
  margin-bottom: 1.125rem;

  font-size: 1.1rem;

  p {
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    margin-top: 0px;
    margin-bottom: 1rem;

    font-family: Apercu, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    font-weight: 400;

    color: rgb(16, 22, 47);

    text-align: left;

    code {
      padding: 0 0.25rem;
      margin: 0 0.0625rem;
      border-radius: 0.125rem;
      color: #15141f;
      background-color: #eae9ed;
      white-space: normal;
      vertical-align: initial;
      font-family: Monaco, Menlo, Ubuntu Mono, Droid Sans Mono,
        Consolas, monospace;
      font-size: 0.8em;
      font-weight: 700;
    }
  }
`;

export const CodeBlock = styled.div`
  margin-bottom: 1.125rem;

  pre {
    margin-top: 0px;
    margin-bottom: 1rem;
    overflow: auto;

    font-family: monospace, monospace;
    font-size: 1em;
  }
`;

export const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33%);
  grid-template-rows: repeat(2, 70%);
  /* align-items: flex-end; */
  text-align: right;
  /* padding: 0 1.3rem; */

  & > * {
    margin: 8px;
  }
`;

export const Button = styled.button`
  grid-column: span 1;
  grid-row: span 1;
  height: calc(36px + 1vw);
  width: calc(36px + 1vw);
  align-self: center;
  justify-self: center;
  border-radius: 100%;
  background-color: #f6f1ef;
  border: 1px solid #75685e;
  box-shadow: 0px 0px 4px #eae5df;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 10px;
  line-height: 1;
  color: #5e5957;
  outline: none;
  &:active {
    filter: brightness(0.95);
    box-shadow: 0px 0px 0px #eae5df;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

interface ButtonProps {
  props?: React.HTMLProps<HTMLButtonElement>;
  children?: React.ReactNode;
}

export const MinusButton: React.FC<ButtonProps> = (
  props,
  children
) => <Button {...props}>{children || <FiMinus />}</Button>;

export const PlusButton: React.FC<ButtonProps> = (
  props,
  children
) => <Button {...props}>{children || <FiPlus />}</Button>;

export const ResetButton: React.FC<ButtonProps> = (
  props,
  children
) => <Button {...props}>{children || 'RESET'}</Button>;

export const FormCardPage = styled.div`
  display: flex;
  background-color: rgb(16, 22, 47);
  flex-direction: column;
  -webkit-box-flex: 1;
  flex-grow: 1;
  -webkit-box-pack: center;
  justify-content: center;
`;

export const FormCardView = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
  align-content: stretch;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  flex: 1 0 auto;

  & > * {
    grid-column: 1/-1;
    padding: 0 2rem;
    @media only screen and (min-width: 64rem) {
      grid-column: 3/11;
      padding: 0;
    }
  }
`;

export const FormCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 15vh;
  padding-bottom: 4rem;
  color: #fff;
  max-width: 40rem;
  margin: auto;
  width: 100%;
`;

export const FormCardContainerTop = styled.div`
  padding-top: 3rem;
  padding-bottom: 1rem;
`;

export const FormCardTitle = styled.h2`
  color: #fff;
  font-size: 3rem;
  text-align: center;

  margin-top: 0px;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.1;
`;

export const FormCard = styled.div`
  width: 100%;
  background: #141c3a;
  border-radius: 1rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 2rem 0;

  color: #fff;
`;

export const FormHeading = styled.h3`
  color: #fd4d3f;
  font-size: 4rem;
  margin: 1.5rem 0 0.5rem;
`;

export const FormText = styled.p`
  font-size: 1.25rem;
  margin-top: 0px;
  margin-bottom: 1rem;
`;

export const FormBottom = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 3rem;
`;

export const FormTop = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const FormTopAbsolute = styled.div`
  display: block;
  /* position: absolute; */
  align-items: center;
  width: 100%;
  padding: 0 4rem;
  margin-top: -10rem;
`;

export const FormTopCell = styled.div`
  flex: 1 1;
  justify-content: space-between;
  height: 4rem;
  padding: 0 2rem;
  border-bottom: 2px solid #0a0e1d;
  font-size: 1.25rem;
  font-weight: 700;

  display: flex;
  align-items: center;

  color: #fff;
  text-align: center;
`;

export const FormTopCellRight = styled(FormTopCell)`
  border-left: 2px solid #0a0e1d;
`;

export const FormBottomLeft = styled.div`
  flex: 1 1;
  justify-content: space-between;
  height: 4rem;
  padding: 0 2rem;
  border-top: 2px solid #0a0e1d;
  font-size: 1.25rem;
  font-weight: 700;

  display: flex;
  align-items: center;

  color: #fff;
  text-align: center;
`;

export const NewRowWrapper = styled(motion.div)`
  padding: 0 1.3rem;
  align-self: flex-start;
  /* flex-direction: row; */
  /* justify-content: flex-start; */
`;

export const tagVariants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 10,
  },
};

export const TagList = styled(motion.ul)`
  display: flex;
  justify-content: flex-start;
  padding: 0;
  list-style: none;
  margin: 5px;
`;

export const TagItem = styled(motion.li)`
  margin: 0 0.25rem;
  color: #0b8ffa;
  background-color: #d1e9fd;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
`;

// eslint-disable-next-line react/no-children-prop
export const GenerateTagList: React.FC<TagProps> = ({
  tags,
  setTagId,
  setCurrentTag,
}) => (
  <TagList variants={tagVariants}>
    {tags.map((tag, index) => (
      <TagItem
        key={index}
        onClick={() => {
          setCurrentTag(tag);
          setTagId(index.toString());
        }}
      >
        {tag}
      </TagItem>
    ))}
  </TagList>
);

export function IconClose() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16px"
      height="16px"
      fill="#fd4d3f"
      role="img"
    >
      <title>Close Icon</title>
      <path
        fill="none"
        stroke="#fd4d3f"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M.75 23.249l22.5-22.5m0 22.5L.75.749"
      />
    </svg>
  );
}

export const FormBottomRight = styled(FormBottomLeft)`
  border-left: 2px solid #0a0e1d;
`;

export const SuccessButton = styled.button`
  margin-bottom: 1.5rem;
  margin-top: 2rem;
  display: flex;
  width: 100%;
  color: #fff;
  background-color: #6400e4;
  border-color: transparent;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  font-weight: 700;
  border: 1px solid transparent;
  border-radius: 2px;
  user-select: none;
  padding: 0.375rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  min-width: 8rem;
  transition: all 0.1s ease-in-out;

  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  margin: 0;
  background: none;
`;

export const DefeatButton = styled.button`
  color: #fff;
  background-color: initial;
  border: 1px solid #fff;
  display: flex;
  width: 100%;
  justify-content: center;
  font-weight: 700;
  border-radius: 2px;
  user-select: none;
  padding: 0.375rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  min-width: 8rem;
  transition: all 0.1s ease-in-out;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  margin: 0;
  background: none;
`;

export const MainContent = styled.main`
  padding-right: 1rem;
  padding-left: 1rem;
  max-width: 1440px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 4rem;

  @media only screen and (min-width: 768px) {
    padding-right: 4rem;
    padding-left: 4rem;
  }
  @media only screen and (min-width: 480px) {
    padding-right: 2rem;
    padding-left: 2rem;
  }
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-row-gap: 1rem;
`;

export const MainSide = styled.div`
  display: none;
  grid-column-end: span 3;
  @media only screen and (min-width: 768px) {
    display: grid;
    grid-column-end: span 3;
  }
`;

export const MainSideAccordion = styled.div`
  padding-bottom: 2.25rem;
`;

export const MainFull = styled.div`
  display: grid;
  grid-column-end: span 12;
  @media only screen and (min-width: 48rem) {
    display: grid;
    grid-column-end: span 9;
  }
`;

export const MainFullAcc = styled.div`
  grid-row-gap: 2rem;
  grid-column-gap: 1rem;
  grid-auto-rows: min-content;
  @media only screen and (min-width: 48rem) {
    display: grid;
    grid-column-end: span 9;
  }
`;

export const MainFullAccTop = styled.div`
  display: grid;
  grid-column-end: span 12;
`;

export const MainFullAccMid = styled.div`
  display: grid;
  grid-column-end: span 12;
`;

export const MainFullAccBottom = styled.div`
  display: grid;
  grid-column-end: span 12;
`;

export const Header = styled.header`
  /* position: relative; */
  /* height: 4rem; */
  z-index: 14;
  border-bottom: 1px solid red;
`;

export const Wrapper = styled.div`
  /* display: flex;
    align-items: center;
		/* height: 100%; */
  display: flex;
  align-items: center;
  z-index: 14;
  width: 100%;

  background-color: #141c3a;
  padding: 1rem 0;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  /* height: 4rem; */
`;

export const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;

  @media only screen and (min-width: 768px) {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }

  @media only screen and (min-width: 1024px) {
    padding-right: 2rem;
    padding-left: 2rem;
  }
`;

export const Box = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

export const BoxSection = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 1;
`;

export const Left = styled(BoxSection)`
  flex: 1 1;
`;

export const HeaderTab = styled.div`
  line-height: 1;
  margin: 0px 0.75rem;

  /* last of type */
  /* margin-right: 0px; */

  a {
    padding: 0;
    font-weight: normal;
    min-width: 2rem !important;
    color: #fff;
    background-color: initial;
    border-color: transparent;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    border: 1px solid transparent;
    border-radius: 2px;
    font-size: 1rem;
    line-height: 1.5;
    transition: all 0.1s ease-in-out;

    /* # basic button */
    /* display: inline-block; */
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    font-family: inherit;
    font: inherit;
    /* padding: 0; */
    margin: 0;
    /* border: none; */
    background: none;
    /* color: inherit; */
    /* line-height: normal; */
  }
  @media only screen and (max-width: 768px) {
    display: block;
  }
  @media only screen and (min-width: 48rem) {
    margin: 0 0.5rem;
  }
`;

export const Right = styled(BoxSection)`
  flex: 1 1;
  justify-content: flex-end;
  z-index: 1;
`;

export const MainFeed: React.FC<SnippetProps> = ({ snippets }) => {
  const label = 'what';
  return (
    <>
      {snippets.map(
        (snippet) =>
          true &&
          true && (
            <>
              {/* <Container key={snippet._id}> */}
              <Card key={snippet._id}>
                <Heading>
                  <p>{snippet.title}</p>
                </Heading>
                <CodeBlock>
                  <Display>
                    <Viewer
                      value={snippet.value}
                      language={snippet.language}
                      id={snippet._id}
                    />
                    {/* <code>
                        <div>
                          from node import Node class Stack:
                          def __init__(self, limit=1000):
                          self.top_item = None self.size = 0
                          self.limit = limit def push(self,
                          value): if self.has_space(): item
                          = Node(value)
                          item.set_next_node(self.top_item)
                          self.top_item = item self.size +=
                          1 else: print("All out of space!")
                        </div>
                      </code> */}
                  </Display>
                </CodeBlock>
                <Description>
                  <p>{snippet.description}</p>
                </Description>
                {/* <ButtonGroup>
                    <MinusButton />
                    <PlusButton />
                    <ResetButton />
                  </ButtonGroup> */}
              </Card>
              {/* </Container> */}
            </>
          )
      )}
    </>
  );
};

interface HeaderProps {
  children?: React.ReactNode;
}

export const MainHeader: React.FC<HeaderProps> = ({ children }) => {
  const label = 'what';
  return (
    <Header>
      <Wrapper>
        <ContentContainer>
          <Box>
            <Left>
              <HeaderTab>
                <NavLink label="Feed" path="/" />
              </HeaderTab>
              <HeaderTab>{children}</HeaderTab>
            </Left>
            <Right>
              <HeaderTab>
                <NavLink label="Favs" path="/" />
              </HeaderTab>
              <HeaderTab>
                <NavLink label="Explore" path="/" />
              </HeaderTab>
              <HeaderTab>
                <NavLink label="Add" path="/" />
              </HeaderTab>
              <HeaderTab>
                <NavLink label="Profile" path="/" />
              </HeaderTab>
              <HeaderTab>
                <NavLink label="Logout" path="/" />
              </HeaderTab>
            </Right>
          </Box>
        </ContentContainer>
      </Wrapper>
    </Header>
  );
};
