/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import styled from 'styled-components';
import {
  FormCardPage,
  FormCardView,
  FormCardContainer,
  FormCardTitle,
  FormCard,
  FormHeading,
  FormText,
  FormBottom,
  FormBottomLeft,
  FormBottomRight,
  IconClose,
  SuccessButton,
  DefeatButton,
  CodeBlock,
  Display,
  Card,
  FormTop,
  FormTopCell,
  FormTopCellRight,
  GenerateTagList,
  NewRowWrapper,
} from './commonCard';
import { Viewer } from '../editor/viewer';
import { TimeAgo } from '../shared/time';
import { Tags } from '../shared/tags';
import { Likes } from '../shared/liked-by';

export const FormPage: React.FC<SnippetProps> = ({
  snippets,
  onTagClick,
  setCurrentTag,
  setTagId,
}) => {
  const what = 'what';
  // const [currentTag, setCurrentTag] = React.useState('');
  // const handleClick = (value: any) => setCurrentTag(value);
  return (
    <>
      {snippets.map(
        (snippet) =>
          true &&
          true && (
            <FormCardPage key={snippet._id}>
              <FormCardView>
                <FormCardContainer>
                  <FormCardTitle>
                    {snippet.title}
                  </FormCardTitle>
                  <FormCard>
                    <FormTop>
                      <FormTopCell>
                        {snippet.language}
                      </FormTopCell>
                      <FormTopCellRight>
                        tests
                      </FormTopCellRight>
                    </FormTop>
                    <>
                      <FormHeading>Heading</FormHeading>
                      <FormText>{snippet.addedBy}</FormText>
                      <FormTop>
                        <FormTopCell>
                          {snippet.language}
                        </FormTopCell>
                        <FormTopCellRight>
                          tests
                        </FormTopCellRight>
                      </FormTop>
                      <CodeBlock style={{ width: '100%' }}>
                        {/* <Display> */}
                        <Viewer
                          value={snippet.value}
                          language={snippet.language}
                          id={snippet._id}
                        />
                        {/* </Display> */}
                      </CodeBlock>
                    </>
                    <NewRowWrapper>
                      <p>
                        <TimeAgo date={snippet.addedOn} />
                      </p>
                    </NewRowWrapper>
                    <NewRowWrapper>
                      <Tags
                        tags={snippet.tags}
                        setCurrentTag={() => setCurrentTag}
                        setTagId={() => onTagClick}
                      />
                      <GenerateTagList
                        setCurrentTag={() => onTagClick}
                        setTagId={() => setTagId}
                        tags={snippet.tags}
                      />
                    </NewRowWrapper>

                    <FormBottom>
                      <FormBottomLeft>
                        <IconClose />3
                      </FormBottomLeft>
                      <FormBottomRight>
                        <IconClose />0
                      </FormBottomRight>
                    </FormBottom>
                  </FormCard>
                  <SuccessButton>Yes</SuccessButton>
                  <DefeatButton>No</DefeatButton>
                </FormCardContainer>
              </FormCardView>
            </FormCardPage>
          )
      )}
    </>
  );
};
