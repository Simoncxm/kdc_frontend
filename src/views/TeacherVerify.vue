<template>
  <div>
    <Header/>
    <VerifyCards/>
  </div>
</template>

<script>

import Header from '../components/Header.vue';
import VerifyCards from '../components/TeacherVerify/VerifyCards.vue';

export default {
  components: { VerifyCards, Header },
};

</script>
