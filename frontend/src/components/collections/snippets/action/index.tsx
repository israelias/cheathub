/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable no-console */

import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Box, Text, useOutsideClick } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { AnimatePresence } from 'framer-motion';
import cn from 'classnames';

import { CardBody } from '../../card-body';

import { MotionBox } from '../../../shared/motion-box';
import { useDataHandler } from '../../../../context/datahandler.context';
import SnippetCrud from '../../../snippet/crud/index';

import '../../styles.css';

interface SnippetActionProps extends RouteComponentProps {
  selectedSnippet: Snippet | undefined;
  expandedSnippet: number;
  setExpandedSnippet: React.Dispatch<React.SetStateAction<number>>;
  setEditingSnippet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SnippetAction = withRouter(
  ({
    selectedSnippet,
    expandedSnippet,
    setExpandedSnippet,
    setEditingSnippet,
  }: SnippetActionProps) => {
    const {
      title,
      setTitle,
      value,
      setValue,
      description,
      setDescription,
      language,
      setLanguage,
      tags,
      setTags,
      source,
      setSource,
      privatize,
      setPrivatize,
      id,
      setId,
      editing,
      setEditing,
      submitting,
      setSubmitting,
      deleting,
      setDeleting,
      alert,
      setAlert,
      heading,
      setHeading,
      clearValues,
      handleDelete,
      handleCancel,
      handleSubmit,
    } = useDataHandler();

    const [message, setMessage] = React.useState('');

    const [snippetId, setSnippetId] = React.useState<string>('');

    const isOpen = expandedSnippet === -1;

    const className = cn('accordion', {
      'accordion--open': isOpen,
      'accordion--next-to-open': expandedSnippet - 1 || false,
    });

    const snippetItemRef = React.useRef<HTMLDivElement>(null);

    useOutsideClick({
      ref: snippetItemRef,
      handler: () => setEditingSnippet(false),
    });

    React.useEffect(() => {
      if (selectedSnippet) {
        setEditing(true);
      } else {
        setEditing(false);
      }
    }, [selectedSnippet]);

    React.useEffect(() => {
      if (selectedSnippet) {
        setId(selectedSnippet._id);
        setTitle(selectedSnippet.title);
        setDescription(selectedSnippet.description);
        setValue(selectedSnippet.value);
        setLanguage(selectedSnippet.language);
        setTags(selectedSnippet.tags.join(', '));
        setPrivatize(selectedSnippet.private === false ? '' : 'On');
        selectedSnippet.source && setSource(selectedSnippet.source);
        setHeading(`Editing ${selectedSnippet.title}`);
      }
    }, [selectedSnippet]);

    React.useEffect(() => {
      if (!isOpen) {
        clearValues();
      }
    }, [isOpen]);

    return (
      <>
        <Box ref={snippetItemRef} className={className}>
          <header onClick={() => setExpandedSnippet(-1)}>
            <Box>
              <Text>{heading}</Text>
            </Box>

            <Box justifySelf="end">
              {isOpen ? (
                <MinusIcon fontSize="12px" />
              ) : (
                <AddIcon fontSize="12px" />
              )}
            </Box>
          </header>
          <AnimatePresence initial={false}>
            {isOpen && (
              <MotionBox
                as="section"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: '0' },
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
              >
                <CardBody
                  description={description}
                  codeId={snippetId}
                  codeValue={value}
                  codeLanguage={language}
                />

                <SnippetCrud
                  snippet={selectedSnippet}
                  editing={editing}
                  setAlert={setAlert}
                  title={title}
                  setTitle={setTitle}
                  language={language}
                  setLanguage={setLanguage}
                  value={value}
                  setValue={setValue}
                  description={description}
                  setDescription={setDescription}
                  tags={tags}
                  setTags={setTags}
                  source={source}
                  setSource={setSource}
                  privatize={privatize}
                  setPrivatize={setPrivatize}
                  submitting={submitting}
                  deleting={deleting}
                  handleSubmit={handleSubmit}
                  handleDelete={handleDelete}
                  handleCancel={handleCancel}
                  message={message}
                />
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </>
    );
  }
);

export default SnippetAction;
