import {
  ROOM_CREATE_FAIL,
  CURRENT_CHAT,
  MYCHAT_LIST,
  CURRENT_CHAT_STORE,
  SOCKET_MESSAGE,
  SOCKET_STATUS,
  SOCKET_ERROR,
} from "../types";

const initialState = {
  currentchat: null,
  chat_createfail: null,
  mychat_list:null,
  socket:{
    status:null,
    errors:null,
    message:null,

  }
};

export default function RoomReducer(state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case ROOM_CREATE_FAIL: {
      return { ...state, chat_createfail: payload[0].msg };
    }
    case CURRENT_CHAT: {
      return { ...state, currentchat: payload, chat_createfail: null };
    }
    case MYCHAT_LIST: {
      if (state.currentchat === null)
        return { ...state, chat_createfail: null, mychat_list: payload };
      else {
        if (payload.chatid.find((chat) => chat.id === state.currentchat._id))
          return { ...state, chat_createfail: null, mychat_list: payload };
        else
          return {
            ...state,
            chat_createfail: null,
            mychat_list: payload,
            currentchat: null,
          };
      }
    }

    case CURRENT_CHAT_STORE: {
      return {
        ...state,
        chat_createfail: null,
        currentchat: state.mychat_list.Allchats.find(
          (chat) => chat._id === payload
        ),
        mychat_list: {
          ...state.mychat_list,
         
          chatid: state.mychat_list.chatid.map((chat) => {
            if (chat.id === payload)
              return { ...chat, Notify:0 };
            else return chat;
          }),
        },
      };
    }

    case SOCKET_STATUS: {
      return {
        ...state,
        chat_createfail: null,
        socket: { ...state.socket, status: payload },
      };
    }
    case SOCKET_ERROR: {
      return {
        ...state,
        chat_createfail: null,
        socket: { ...state.socket, errors: payload },
      };
    }

    case SOCKET_MESSAGE: {
      if (state.currentchat!==null && state.currentchat._id === payload.chat_id)
        return {
          ...state,
          chat_createfail: null,
          socket: { ...state.socket, message: payload },
          mychat_list: {
            ...state.mychat_list,
            Allchats: state.mychat_list.Allchats.map((i_chat) => {
              if (i_chat._id === payload.chat_id) {
                return { ...i_chat, chat: [...i_chat.chat, payload] };
              } else return i_chat;
            }),
          },

          currentchat: {
            ...state.currentchat,
            chat: [...state.currentchat.chat, payload],
          },
        };
      else
        return {
          ...state,
          chat_createfail: null,
          socket: { ...state.socket, message: payload },
          mychat_list: {
            ...state.mychat_list,
            Allchats: state.mychat_list.Allchats.map((i_chat) => {
              if (i_chat._id === payload.chat_id) {
                return { ...i_chat, chat: [...i_chat.chat, payload] };
              } else return i_chat;
            }),
            chatid: state.mychat_list.chatid.map((chat) => {
              if (chat.id === payload.chat_id)
                return { ...chat, Notify: 1 + chat.Notify };
              else return chat;
            }),
          },
        };
    }

    default: {
      return { ...state };
    }
  }

}
