import React, { useState, useEffect } from "react";
import taskList from "../../static/tasks";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Tasks() {
  const [weeklyTasks, setWeeklyTasks] = useState(taskList);
  const [dailyTasks, setDailyTasks] = useState([]);

  useEffect(() => {
    setWeeklyTasks(taskList);
  }, [taskList]);

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!result.destination) return;
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "tasket") {
        let tempWeeklyTasks = Array.from(weeklyTasks);
        const [reorderedItem] = tempWeeklyTasks.splice(result.source.index, 1);
        tempWeeklyTasks.splice(destination.index, 0, reorderedItem);
        setWeeklyTasks(tempWeeklyTasks);
      } else {
        let tempDailyTasks = Array.from(dailyTasks);
        const [reorderedItem] = tempDailyTasks.splice(result.source.index, 1);
        tempDailyTasks.splice(destination.index, 0, reorderedItem);
        setDailyTasks(tempDailyTasks);
      }
    } else {
      let tempWeeklyTasks = weeklyTasks;
      let tempDailyTasks = dailyTasks;

      if (source.droppableId === "tasket") {
        const [removed] = tempWeeklyTasks.splice(source.index, 1);
        tempDailyTasks.splice(destination.index, 0, removed);
        setDailyTasks(tempDailyTasks);
        setWeeklyTasks(tempWeeklyTasks);
      } else {
        const [removed] = tempDailyTasks.splice(source.index, 1);
        tempWeeklyTasks.splice(destination.index, 0, removed);
        setDailyTasks(tempDailyTasks);
        setWeeklyTasks(tempWeeklyTasks);
      }
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="tasker">
        <div className="container">
          <Droppable droppableId="tasket">
            {(provided) => (
              <div
                className="weekly box"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h3>Weekly Tasks</h3>
                {weeklyTasks.map(({ id, item }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <p
                          className="task"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item}
                        </p>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="tasketer">
            {(provided) => (
              <div
                className="daily box"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h3>Daily Targets</h3>
                {dailyTasks.map(({ id, item }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <p
                          className="task"
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          {item}
                        </p>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
