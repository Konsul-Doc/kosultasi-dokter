import React, {useEffect, useRef} from 'react';
import Other from './Other';
import IsMe from './isMe';

export default function ChatItems({isMe, text, date, photo}) {
  if (isMe) {
    return <IsMe title={text} date={date} />;
  }
  return <Other title={text} date={date} photo={photo} />;
}
