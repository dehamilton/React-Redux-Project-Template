// eslint-disable-next-line import/prefer-default-export
export const applicationStateSchema = {
  reducers: {
    additionalProperties: false,
    properties: {
      isLoading: { type: 'boolean' },
      schemaTest: { type: 'array' },
      tableData: { type: 'array' },
      tableDataOriginal: { type: 'array' },
      tableStats: { type: 'object' },
      tableSorting: { type: 'object' },
      tableSelection: { type: 'object' },
    },
  },
};
