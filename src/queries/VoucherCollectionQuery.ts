export const VoucherCollectionQuery = () => `
{
  voucherCollection {
    items{
      name,
      value
    }
  }
}
`;
