export const validClientInput = {
  name: 'Gabriel Herdina',
  email: 'gabs@dev.com',
  fiscalIdentifier: '16167877912',
};

export const invalidCPFInput = {
  name: 'Gabriel Herdina',
  email: 'gabs@dev.com',
  fiscalIdentifier: '16167877938',
};

export const invalidCPFFormatInput = {
  name: 'Gabriel Herdina',
  email: 'gabs@dev.com',
  fiscalIdentifier: '161678779',
};

export const mockSuccessResponse = {
  createdAt: '2024-10-20T19:43:36.335Z',
  id: 'f2b4e27b-86fa-41e4-92bc-7506ebb111a7',
  name: 'Gabriel Herdina',
  email: 'gabs@dev.com',
  fiscalIdentifier: '16167877912',
  updatedAt: '2024-10-20T19:43:36.336Z',
};

export const mockCPFFormatErrorResponse = {
  message: 'CPF must be a string with 11 numeric digits only.',
};

export const mockInvalidCPFErrorResponse = {
  message: 'Invalid CPF.',
};
