export const getISDString = (ISDFrom: string, ISDTo: string) =>
  ISDFrom && ISDTo
    ? `${ISDFrom}-${ISDTo}`
    : ISDFrom
      ? `${ISDFrom}+`
      : ISDTo
        ? `Until ${ISDTo}`
        : '-';
