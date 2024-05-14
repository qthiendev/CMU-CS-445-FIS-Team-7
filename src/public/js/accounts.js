// Permission
const tablePermissions = document.querySelector("#table-permissions");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("#button-submit");

  buttonSubmit.addEventListener("click", () => {
    var permission = [];

    const rows = tablePermissions.querySelectorAll("[data-name]");

    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");

      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          permission.push({
            id: id,
            permission: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;

          if (checked) {
            permission[index].permission.push(name);
          }
        });
      }
    });

    if (permission.length > 0) {
      const formChangePermissions = document.querySelector(
        "#form-change-permissions"
      );
      const inputPermissions = formChangePermissions.querySelector(
        "input[name='permissions']"
      );
      inputPermissions.value = JSON.stringify(permission);
      formChangePermissions.submit();
    }
  });
}
// End Permission

// Permissions Default
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));

  const tablePermissions = document.querySelector("#table-permissions");

  records.forEach((record, index) => {
    const permissions = record.permission;
    permissions.forEach((permission) => {
      const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
      const input = row.querySelectorAll("input")[index];

      input.checked = true;
    });
  });
}
// End Permissions Default

// Delete roles
const buttonDelete = document.querySelectorAll("#button-delete");
const formDelete = document.querySelector("#form-delete-role");
if (buttonDelete.length > 0) {
  const path = formDelete.getAttribute("data-path");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có muốn xóa không");
      if (isConfirm) {
        const id = button.getAttribute("data-id");

        action = `${path}/${id}?_method=DELETE`;

        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}

//Delete Account//
const buttonDeleteAccount = document.querySelectorAll("[button-delete]");
const fomrDelete = document.querySelector("#form-delete-account");

if (buttonDeleteAccount.length > 0) {
  const path = fomrDelete.getAttribute("data-path");
  buttonDeleteAccount.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có muốn xóa không");
      if (isConfirm) {
        const id = button.getAttribute("data-id");

        action = `${path}/${id}?_method=DELETE`;

        fomrDelete.action = action;
        fomrDelete.submit();
      }
    });
  });
}
//End Delete Account//
