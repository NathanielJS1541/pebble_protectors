<script setup lang="ts">
import { ref, computed } from 'vue';
import { EventBus } from '../EventBus';
import Phaser from 'phaser';
</script>

<script lang="ts">

const nameList = ref(new Array(
    { name: "Alice", in: "07:00", out: "10:00" },
    { name: "Bob", in: "08:00", out: "11:00" },
    { name: "Charlie", in: "09:00", out: "12:00" },
    { name: "Dom", in: "10:00", out: "13:00" },
    { name: "Ellis", in: "11:00", out: "14:00" },
    { name: "Frank", in: "12:00", out: "15:00" },
    { name: "Gertrude", in: "13:00", out: "16:00" },
    { name: "Harriet", in: "14:00", out: "17:00" },
    { name: "Ivan", in: "15:00", out: "18:00" },
    { name: "Jeremy", in: "07:00", out: "10:00" },
    { name: "Karen", in: "07:00", out: "10:00" },
    { name: "Lauren", in: "07:00", out: "10:00" },
    { name: "Maurice", in: "07:00", out: "10:00" },
    { name: "Norbert", in: "07:00", out: "10:00" },
    { name: "Oswald", in: "07:00", out: "10:00" },
    { name: "Peter", in: "07:00", out: "10:00" },
    { name: "Quavius", in: "07:00", out: "10:00" },
    { name: "Robert", in: "07:00", out: "10:00" },
    { name: "Sam", in: "07:00", out: "10:00" },
    { name: "Trevor", in: "07:00", out: "10:00" },
    { name: "Ursula", in: "07:00", out: "10:00" },
    { name: "Vanessa", in: "07:00", out: "10:00" },
    { name: "Walter", in: "07:00", out: "10:00" },
    { name: "Xander", in: "07:00", out: "10:00" },
    { name: "Yaseen", in: "07:00", out: "10:00" },
    { name: "Zach", in: "07:00", out: "10:00" }
))

const filterText = ref("")

const filteredModel = computed(() => {
    return nameList.value.filter((person) =>
        person.name.toLowerCase().includes(filterText.value.toLowerCase()))
})

</script>

<template>
    <div class="inFilter">
        <input type="text" placeholder="Filter Name" v-model="filterText">
    </div>
    <div class="results">
        <table>
            <th>Name</th>
            <th>Clocked In</th>
            <th>Clocked Out</th>
            <tr v-for="person in filteredModel" :key="person.name">
                <td>{{ person.name }}</td>
                <td>{{ person.in }}</td>
                <td>{{ person.out }}</td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
input {
    font-size: 2em;
    font-family: monospace;
    margin-bottom: 10px;
    width: 716px;
}

table {
    width: 724px;
    color: #e7e7e7;
    font-size: 2em;
}

.results {
    background-color: #291829;
    width: 724px;
    height: 500px;
    overflow: hidden scroll;
}

td {
    text-align: center;
}
</style>