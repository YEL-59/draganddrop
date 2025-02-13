import { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../utils/dragUtils";

const DATA = [
  {
    id: "af3",
    label: "Incoming leads",
    items: [
      { id: "af31", label: "Item 3.1 - Yoni the Bo$$" },
      { id: "af32", label: "Item 3.2 - Sed tellus risus" },
      { id: "af33", label: "Item 3.3 - Praesent nec massa vel ante" },
    ],
    tint: "bg-blue-500",
  },
  {
    id: "af1",
    label: "Closing leads",
    items: [
      { id: "af11", label: "Item 1.1 - Sed sit amet ornare nisi" },
      { id: "af12", label: "Item 1.2 - Donec aliquet commodo justo" },
    ],
    tint: "bg-green-500",
  },
  {
    id: "af2",
    label: "On hold",
    items: [
      { id: "af21", label: "Item 2.1 - Vivamus eget ante tempor" },
      { id: "af22", label: "Item 2.2 - Pellentesque euismod" },
    ],
    tint: "bg-red-500",
  },
];

const LeadsOverview = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(DATA);
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Container
        getChildPayload={(index) => items[index]}
        onDrop={(dropResult) => setItems(applyDrag(items, dropResult))}
        orientation="horizontal"
        dragHandleSelector=".drag-handle"
      >
        {items.map((group, index) => (
          <Draggable key={group.id}>
            <div
              className={`p-4 m-2 rounded-lg ${group.tint} text-white shadow-md`}
            >
              <h3 className="font-bold text-lg">{group.label}</h3>
              <Container
                className="mt-2 space-y-2"
                getChildPayload={(i) => group.items[i]}
                groupName="LEADS_OVERVIEW"
                onDrop={(dropResult) => {
                  const newItems = [...items];
                  newItems[index].items = applyDrag(group.items, dropResult);
                  setItems(newItems);
                }}
              >
                {group.items.map((item) => (
                  <Draggable key={item.id}>
                    <div className="p-2 bg-gray-700 rounded-lg shadow-md cursor-pointer">
                      {item.label}
                    </div>
                  </Draggable>
                ))}
              </Container>
            </div>
          </Draggable>
        ))}
      </Container>
    </div>
  );
};

export default LeadsOverview;
