import React, { useState } from 'react';
import styled from 'styled-components';

const VisuallyHidden = styled.textarea`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
`;

const CopyButton = styled.button`
font-weight: 500;
  background-color: white;
  border: 0;
  outline: 0;
  cursor: pointer;
  opacity: 1;
  width: 80px;
  height: 40px;
  z-index: 9;
  border-radius: 16px;
`;

const ButtonTooltipContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 30px;
  /* background-color: yellow; */
`;

const CustomTooltip = styled.span`
  position: absolute;
  margin-top: 6px;
  top:80%;
  left: 50%;
  transform: translateX(40%);
  display: none;
  padding: 5px 12px;
  background-color: #000000df;
  border-radius: 4px;
  color: #fff;
  opacity: 75%;
`;

const CopyLinkButton = () => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const copyToClipboard = () => {
    const urlBox = document.getElementById('box');
    urlBox.value = window.location.href;
    urlBox.focus();
    urlBox.select();
    document.execCommand('copy');

    setTooltipVisible(true);

    setTimeout(() => {
      setTooltipVisible(false);
    }, 500);
  };

  return (
    <ButtonTooltipContainer>
      <CopyButton title="Copy Share Link" onClick={copyToClipboard}>
        Copy
      </CopyButton>
      <CustomTooltip style={{ display: isTooltipVisible ? 'inline' : 'none' }}>Copied!</CustomTooltip>
      <VisuallyHidden id="box" />
    </ButtonTooltipContainer>
  );
};

export default CopyLinkButton;
