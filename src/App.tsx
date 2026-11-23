import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaMinus } from 'react-icons/fa';
import './App.css';

const list = [
  { id: 1, name: 'Parent 1', parentId: null },
  { id: 2, name: 'Child 1.1', parentId: 1 },
  { id: 3, name: 'Child 1.2', parentId: 1 },
  { id: 4, name: 'Parent 2', parentId: null },
  { id: 5, name: 'Child 2.1', parentId: 4 },
  { id: 6, name: 'Child 1.1.1', parentId: 2 },
  { id: 7, name: 'Child 1.1.2', parentId: 2 },
  { id: 8, name: 'Child 2.1.1', parentId: 5 },
  { id: 9, name: 'Child 2.1.2', parentId: 5 },
  { id: 10, name: 'Parent 3', parentId: null },
  { id: 11, name: 'Child 3.1', parentId: 10 },
];

type Item = {
  id: number;
  name: string;
  parentId: number | null;
};

const getChildren = (parentId: number | null, list: Item[]) => {
  return list.filter((item) => item.parentId === parentId);
};

const List = ({ item, originalList, level = 0 }) => {
  const [open, setOpen] = useState(false);
  const { name, id } = item;
  const childrenList = getChildren(id, list);

  const openIndigator = open ? <FaChevronDown /> : <FaChevronUp />;
  const icon = childrenList.length ? openIndigator : <FaMinus />;

  return (
    <div className="list" style={{ paddingLeft: `${level * 10}px` }}>
      <span
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {<span>{icon}</span>}
        {name}
      </span>
      {open && (
        <div>
          {childrenList.map((children) => (
            <List
              item={children}
              originalList={originalList}
              key={children.id}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  const rootItems = getChildren(null, list);
  const level = 0;
  return (
    <>
      <div>
        {rootItems.map((item) => (
          <List
            item={item}
            originalList={list}
            key={item.id}
            level={level + 1}
          />
        ))}
      </div>
    </>
  );
}

export default App;
