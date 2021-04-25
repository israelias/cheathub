import { motion } from 'framer-motion';
import styled from 'styled-components';

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
//  <Card key={snippet._id}>
//    <Heading>
//      <p>{snippet.title}</p>
//    </Heading>
//    <CodeBlock>
//      <Display>
//        <Viewer
//          value={snippet.value}
//          language={snippet.language}
//          id={snippet._id}
//        />
//        {/* <code>
//                         <div>
//                           from node import Node class Stack:
//                           def __init__(self, limit=1000):
//                           self.top_item = None self.size = 0
//                           self.limit = limit def push(self,
//                           value): if self.has_space(): item
//                           = Node(value)
//                           item.set_next_node(self.top_item)
//                           self.top_item = item self.size +=
//                           1 else: print("All out of space!")
//                         </div>
//                       </code> */}
//      </Display>
//    </CodeBlock>
//    <Description>
//      <p>{snippet.description}</p>
//    </Description>
//    {/* <ButtonGroup>
//                     <MinusButton />
//                     <PlusButton />
//                     <ResetButton />
//                   </ButtonGroup> */}
//  </Card>;
//  {
//    /* </Container> */
//  }
