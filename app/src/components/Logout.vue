<template>
    <div></div>
</template>

<script>
    import firebase from 'firebase';
    
    export default {
        name: 'companies',
        mounted() {
            if(!this.$store.state.loggedIn) {
                this.$router.replace('/');
                return;
            }

            firebase.auth().signOut().then(res => {
                // Successful
                this.$store.commit('loggedOut');
                this.$router.replace('/');
            });
        }
    }
</script>