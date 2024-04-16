document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const tableBody = document.querySelector('tbody');

  // Event listener for the form submit
  form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form from submitting to allow validation

      // Check for empty fields in the form
      const name = form.querySelector('input[type="text"]');
      const email = form.querySelector('input[type="email"]');
      const role = form.querySelector('select');
      
      if (name.value.trim() === '' || email.value.trim() === '' || role.value.trim() === '') {
          alert('Please fill in all fields.');
          return;
      }

      // If validation passes, call appendValues to add the form data to the table
      appendValues(name.value, email.value, role.value);

      // Clear form fields after appending values
      name.value = '';
      email.value = '';
      role.selectedIndex = 0; // Reset select to the first option
  });

  // Function to append values to the table
  function appendValues(name, email, role) {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td class="border p-2">${tableBody.rows.length + 1}</td>
          <td class="border p-2">${name}</td>
          <td class="border p-2">${email}</td>
          <td class="border p-2">${role}</td>
          <td class="border p-2">
              <button class="text-blue-500 p-1"><i class="fas fa-edit"></i></button>
              <button class="text-red-500 p-1"><i class="fas fa-trash-alt"></i></button>
          </td>
      `;
      tableBody.appendChild(newRow);
  }

  // Event listener for click events in the table body
  tableBody.addEventListener('click', function (event) {
      const target = event.target.closest('button'); // Ensure we're clicking on the button and not outside
      if (!target) return; // If not clicking on a button, do nothing

      const row = target.closest('tr');
      if (target.innerHTML.includes('fa-trash-alt')) {
          // Handle delete action
          if (confirm('Are you sure you want to delete this row?')) {
              row.remove();
          }
      } else if (target.innerHTML.includes('fa-edit')) {
          // Handle edit action
          const name = prompt('Edit name:', row.cells[1].textContent);
          const email = prompt('Edit email:', row.cells[2].textContent);
          if (name !== null && email !== null) { // Check if user didn't press cancel
              row.cells[1].textContent = name;
              row.cells[2].textContent = email;
          }
      }
  });
});