import React, { FC, useState, useRef, useEffect } from 'react';
import { Button } from '../Button';
import { ButtonSizes } from '../Button/Button';
import { CollapsedTextWrapper, WrappedText } from './CollapsedTextStyled';

const DEFAULT_LINE_HEIGHT = 1.125;
const DEFAULT_VISIBLE_ROWS = 2;
const DEFAULT_FONT_SIZE = 1;

export const calculateLineHeight = (fontSize: number) => (DEFAULT_LINE_HEIGHT / DEFAULT_FONT_SIZE) * fontSize;

interface CollapsedTextProps {
  visibleRows?: number;
  fontSize?: number;
}

/**
 * Component to control `read more` appearence statement (if needed)
 */
const CollapsedText: FC<CollapsedTextProps> = ({ visibleRows = DEFAULT_VISIBLE_ROWS, fontSize = DEFAULT_FONT_SIZE, children }) => {
  const textRef = useRef<HTMLDivElement>();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (textRef?.current) {
      const textHeight = textRef.current.clientHeight;
      if (textHeight > visibleRows * fontSize * DEFAULT_LINE_HEIGHT * 16) {
        setCollapsed(true);
      }
    }
  }, [fontSize, visibleRows]);

  return (
    <CollapsedTextWrapper>
      <WrappedText
        ref={textRef as any}
        maxHeight={collapsed ? `${calculateLineHeight(fontSize) * visibleRows}rem` : 'initial'}
        lineHeight={`${calculateLineHeight(fontSize)}rem`}
      >
        {children}
      </WrappedText>
      {collapsed && (
        <Button size={ButtonSizes.XS} onClick={() => setCollapsed(!collapsed)}>
          Read more
        </Button>
      )}
    </CollapsedTextWrapper>
  );
};

export default CollapsedText;
