import React, { useEffect, useState } from 'react';
import styles from './movingborder.module.scss';
import Image from 'next/image';

const HeaderElement = ({
  store,
  value,
  id
}: {
  store: DragStore;
  value: number;
  id: any;
}) => {
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [width, setWidth] = useState(10);
  const [state, setState] = useState({
    preWidth: width
  });
  useEffect(() => {
    store.setObject(id, {
      onMouseDown: () => {
        setBackgroundColor('yellow');
      },
      onMouseMove: (posGap: any) => {
        setWidth(state.preWidth + posGap.x);
      },
      onMouseUp: () => {
        setBackgroundColor('white');
        state.preWidth = width;
      }
    });
  }, [width]);

  return (
    <>
      <div
        draggable={false}
        className={styles.headerContent}
        style={{ backgroundColor: backgroundColor, width: width }}
      >
        {value}
      </div>
      <div
        draggable={false}
        className={styles.drag}
        onMouseDown={() => {
          store.curKey = id;
          store.onMouseDown();
        }}
        onBlur={() => {
          state.on = false;
          state.preWidth = width;
        }}
      />
    </>
  );
};

type Props = {};

const DragArea = ({ children, store }: { children: any; store: DragStore }) => {
  const [state, setState] = useState({
    on: false,
    prePosX: 0
  });
  return (
    <div
      onMouseDownCapture={e => {
        state.on = true;
        state.prePosX = e.clientX;
        store.onMouseDown();
      }}
      onMouseMove={e => {
        if (!state.on) return;
        const gapPos = {
          x: e.clientX - state.prePosX
        };
        store.onMouseMove(gapPos);
      }}
      onMouseUpCapture={e => {
        if (!state.on) return;
        state.on = false;
        store.onMouseUp();
      }}
    >
      {children}
    </div>
  );
};

interface DragObject {
  [key: string]: {
    onMouseDown: () => void;
    onMouseMove: (gapPos: any) => void;
    onMouseUp: () => void;
  } | null;
}

class DragStore {
  objectList: DragObject = {};
  curKey: string | number = 0;

  onMouseDown = () => {
    this.objectList[this.curKey]?.onMouseDown();
  };
  onMouseMove = (gapPos: any) => {
    this.objectList[this.curKey]?.onMouseMove(gapPos);
  };
  onMouseUp = () => {
    this.objectList[this.curKey]?.onMouseUp();
    this.curKey = 0;
  };
  setObject = (key: string, object: any) => {
    const obj: { [key: string]: any } = {};
    obj[key] = object;
    Object.assign(this.objectList, obj);
  };
}

const index = (props: Props) => {
  useEffect(() => {}, []);
  const dragStore = new DragStore();
  return (
    <>
      <DragArea store={dragStore}>
        <div style={{ height: '100vh' }}>
          <div className={`${styles.table} ${styles.header}`}>
            <HeaderElement
              store={dragStore}
              value={1}
              key={1}
              id={1}
            ></HeaderElement>
            <HeaderElement
              store={dragStore}
              value={2}
              key={2}
              id={2}
            ></HeaderElement>
            {/* <HeaderElement value={2} key={2}></HeaderElement> */}
          </div>
        </div>
      </DragArea>
    </>
  );
};

export default index;
