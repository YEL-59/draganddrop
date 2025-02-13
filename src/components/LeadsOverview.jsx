import { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../utils/dragUtils"; // Utility function to handle drag logic

// Sample data representing different lead stages
const DATA = [
  {
    id: "af3",
    label: "Incoming leads", // Column title
    items: [
      { id: "af31", label: "Item 3.1 - Yoni the Bo$$" },
      { id: "af32", label: "Item 3.2 - Sed tellus risus" },
      { id: "af33", label: "Item 3.3 - Praesent nec massa vel ante" },
    ],
    tint: "bg-blue-500", // Background color for the column
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
  const [items, setItems] = useState([]); // State to hold the lead data

  // Load the initial data when the component mounts
  useEffect(() => {
    setItems(DATA);
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Outer Container for Dragging Entire Groups */}
      <Container
        getChildPayload={(index) => items[index]} // Returns the entire group when dragged
        onDrop={(dropResult) => setItems(applyDrag(items, dropResult))} // Handles reordering of groups
        orientation="horizontal" // Groups are arranged horizontally
        dragHandleSelector=".drag-handle" // Optional: Define a specific handle for dragging
      >
        {items.map((group, index) => (
          <Draggable key={group.id}>
            {/* Group Container (Each Lead Stage) */}
            <div
              className={`p-4 m-2 rounded-lg ${group.tint} text-white shadow-md`}
            >
              <h3 className="font-bold text-lg">{group.label}</h3>

              {/* Inner Container for Dragging Items Within the Group */}
              <Container
                className="mt-2 space-y-2"
                getChildPayload={(i) => group.items[i]} // Returns an individual item when dragged
                groupName="LEADS_OVERVIEW" // Allows dragging between different groups
                onDrop={(dropResult) => {
                  const newItems = [...items];
                  newItems[index].items = applyDrag(group.items, dropResult); // Updates item positions inside the group
                  setItems(newItems); // Updates the state
                }}
              >
                {group.items.map((item) => (
                  <Draggable key={item.id}>
                    {/* Individual Draggable Item */}
                    <div className="p-2 bg-gray-700 rounded-lg shadow-md mt-2 cursor-pointer">
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

/* Outer Container → Allows reordering of groups (lead stages)
 Inner Container → Handles reordering of items (leads) within groups
 Drag-and-drop events (onDrop) update the state dynamically
 applyDrag function handles inserting/removing items correctly*/
