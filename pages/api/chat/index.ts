type ChatInfoType = {
  messageId: number;
  userId: number;
  userNickName: string;
  isMine: boolean;
  message: string;
  time: Date;
};
const chatInfoDefault: ChatInfoType = {
  messageId: 0,
  userId: 0,
  userNickName: '손님',
  isMine: false,
  message: '안녕하세요.',
  time: new Date()
};

const chatList: ChatInfoType[] = Array(100)
  .fill({})
  .map((_, index) => {
    const isMine = index % 2;
    return {
      messageId: index,
      userId: 10,
      userNickName: isMine ? '방장' : '손님',
      isMine: Boolean(isMine),
      message: '안녕하세요.' + index,
      time: new Date()
    };
  });

export default async (req, res) => {
  console.log('query : ', req.query);
  const { startPage, pageNum } = req.query;
  const result = chatList.slice(startPage, startPage + pageNum);
  // const page = parseInt(req.query.page) || 0;
  res.json(req.query);
};
