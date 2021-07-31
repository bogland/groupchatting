import React, { useEffect, useState } from 'react';
import styles from './movingborder.module.scss';
import Image from 'next/image';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';

const HeaderElement = ({ value, id }: { value: number; id: any }) => {
  const widthList = useRecoilValue(widthListState);
  const setWidthList = useSetRecoilState(widthListState);
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [width, setWidth] = useState(10);
  const [state, setState] = useState({
    preWidth: width
  });
  console.log('id : ', id);
  return (
    <>
      <div
        className={styles.headerContent}
        style={{ backgroundColor: backgroundColor, width: width }}
      >
        {value}

        <Draggable
          id={id}
          observer={width}
          onMouseDown={() => {
            setBackgroundColor('yellow');
          }}
          onMouseMove={(posGap: any) => {
            const width = state.preWidth + posGap.x;
            setWidth(width);
            const array: any[] = widthList.slice();
            array[id] = width;
            setWidthList(array);
          }}
          onMouseUp={() => {
            setBackgroundColor('white');
            state.preWidth = width;
          }}
        >
          <div className={styles.drag} />
        </Draggable>
      </div>
    </>
  );
};

type Props = {};
const Draggable = ({
  id,
  observer,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  children
}: any) => {
  useEffect(() => {
    store.setObject(id, {
      onMouseDown: () => {
        onMouseDown(id);
      },
      onMouseMove: (posGap: any) => {
        onMouseMove(posGap);
      },
      onMouseUp: () => {
        onMouseUp();
      }
    });
  });
  return (
    <div
      onMouseDownCapture={() => {
        store.onMouseDown(id);
      }}
      className={styles.draggable}
    >
      {children}
    </div>
  );
};
const DragArea = ({ children }: { children: any; store: DragStore }) => {
  return (
    <div
      onMouseDownCapture={e => {
        store.state.prePosX = e.clientX;
      }}
      onMouseMove={e => {
        if (!store.state.on) return;
        const gapPos = {
          x: e.clientX - store.state.prePosX
        };
        const array = store.onMouseMove(gapPos);
      }}
      onMouseUpCapture={e => {
        if (!store.state.on) return;
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
  curKey: string | number = -1;
  state: { on: boolean; prePosX: number } = { on: false, prePosX: 0 };

  onMouseDown = (id?: any) => {
    this.state.on = true;
    if (id != null) this.curKey = id;
    this.objectList[this.curKey]?.onMouseDown();
  };
  onMouseMove = (gapPos: any) => {
    this.objectList[this.curKey]?.onMouseMove(gapPos);
  };
  onMouseUp = () => {
    this.objectList[this.curKey]?.onMouseUp();
    this.curKey = -1;
    this.state.on = false;
  };
  setObject = (key: string, object: any) => {
    const obj: { [key: string]: any } = {};
    obj[key] = object;
    Object.assign(this.objectList, obj);
  };
}

export const store = new DragStore();

const widthListState = atom({
  key: 'widthList',
  default: []
});
const widthListSelector = selector({
  key: 'widthListSelector',
  get: ({ get }) => {
    return get(widthListState);
  }
});

const index = (props: Props) => {
  const setWidthList = useSetRecoilState(widthListState);
  const widthList = useRecoilValue(widthListState);
  useEffect(() => {
    const array = Array.apply(null, new Array(5)).map(
      Number.prototype.valueOf,
      10
    );
    setWidthList(array);
  }, []);
  console.log(widthList);
  const headers = [1, 2, 3, 4, 5];
  const rowList = { 0: [1, 2, 3, 4, 5], 1: [7, 8, 9, 10, 11] };
  return (
    <>
      <DragArea store={store}>
        <div style={{ height: '100vh' }}>
          <div className={`${styles.header}`}>
            {headers.map((header, index: number) => {
              return (
                <HeaderElement
                  value={header}
                  key={index}
                  id={index}
                ></HeaderElement>
              );
            })}
          </div>
          {Object.values(rowList).map((row, index) => {
            return (
              <>
                <div className={styles.row}>
                  {row.map((one, index: number) => {
                    return (
                      <div key={index} style={{ width: widthList[index] }}>
                        {one}
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </DragArea>
    </>
  );
};

export default index;
