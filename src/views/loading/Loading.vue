<template>
    <v-row justify="space-around">
        <v-col cols="auto">
            <v-dialog persistent transition="dialog-top-transition" max-width="600" v-model="isLoading">
                <v-card color="red darken-3" dark>
                    <v-card-text>
                        <br>
                        {{msg}}
                    <v-progress-linear indeterminate rounded color="white" class="mb-0" height="15" striped></v-progress-linear>
                    <br>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'Loading',
    props: ['msg', 'isLoading'],
}
</script>