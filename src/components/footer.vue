<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 text-sm-right">
          <p>&copy; {{ currentYear }} Pre-Forensics. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
