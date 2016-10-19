  $(() => {
    $('a[data-action="deleteCourse"]').on('click', (e) => {
      e.preventDefault();

      const courseId = e.target.getAttribute('data-courseId');
      $.ajax(`http://localhost:3000/api/1/courses/${courseId}`, {
        method: 'DELETE',
        success: () => {
          // Refresh page to show changes
          document.location.reload();
        },
      });
    });

    $('a[data-action="deleteSection"]').on('click', (e) => {
      e.preventDefault();

      const sectionId = e.target.getAttribute('data-sectionId');
      $.ajax(`http://localhost:3000/api/1/sections/${sectionId}`, {
        method: 'DELETE',
        success: () => {
          // Refresh page to show changes
          document.location.reload();
        },
      });
    });

    $('a[data-action="deleteUser"]').on('click', (e) => {
      e.preventDefault();

      const userId = e.target.getAttribute('data-userId');
      $.ajax(`http://localhost:3000/api/1/users/${userId}`, {
        method: 'DELETE',
        success: () => {
          // Refresh page to show changes
          document.location.reload();
        },
      });
    });
  });
