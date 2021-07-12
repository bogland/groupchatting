// an endpoint for getting projects data

export type TestType = {
  id: number;
  title: string;
};

export default async (req, res) => {
  // const page = parseInt(req.query.page) || 0;
  const result: TestType = { id: 0, title: 'test' + Math.random() };
  await new Promise(r => setTimeout(r, 1000));

  res.json(result);
};
