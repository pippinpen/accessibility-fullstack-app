// exports.productCategories = ["starter", "main", "dessert", "beverage"];

exports.UserPermission = Object.freeze({
  CreateUsers: "create:users",
  DeleteUsers: "delete:users",
  ReadUsers: "read:users",
  UpdateUsers: "update:users",
  CreateOwnUser: "create:user:own",
  DeleteOwnUser: "delete:user:own",
  ReadOwnUser: "read:user:own",
  UpdateOwnUser: "update:user:own"
});

exports.FormTypePermission = Object.freeze({
  CreateFormType : "create:formType",
  DeleteFormType: "delete:formType",
  ReadFormTypes: "read:formTypes",
  UpdateFormType: "update:formType",
});
