import { EdgeRoom } from '@/pages/Map/edgeRoom';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface EdgeRoomContext {
  edgeRooms: EdgeRoom[];
  setEdgeRooms: Dispatch<SetStateAction<EdgeRoom[]>>;
  // 用于列表激活的节点
  activeEdgeRoom: EdgeRoom | null;
  setActiveEdgeRoom: Dispatch<SetStateAction<EdgeRoom | null>>;
}

const EdgeRoomContext = createContext<EdgeRoomContext>({
  edgeRooms: [],
  setEdgeRooms: () => {},
  activeEdgeRoom: null,
  setActiveEdgeRoom: () => {},
} as EdgeRoomContext);

export const useEdgeRoomContext = () => useContext(EdgeRoomContext);

export const EdgeRoomProvider = EdgeRoomContext.Provider;
