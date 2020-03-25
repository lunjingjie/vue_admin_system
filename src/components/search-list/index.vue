<template>
  <div>
    <v-row>
      <v-col
        cols="12"
      >
        <v-card style="border-left: 4px solid #2196F3; border-radius: 2px;" class="mx-3 pt-0 pb-2 pl-2 pr-2">
          <slot/>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
  export default {
    name: 'SearchList',
  };
</script>
