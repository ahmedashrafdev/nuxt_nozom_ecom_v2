<template>  
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    >
        <div class="mb-10" v-if="err">
            <v-alert
            border="top"
            color="red lighten-2"
            v-if="typeof err == 'string'"
            dark
            >
            {{err}}
            </v-alert>
        </div>
        <v-text-field
            v-model="form.BuildingNo"
            :rules="rules.BuildingNo"
            label="Building"
            required
        ></v-text-field>
        <ul v-if="errors.BuildingNo && errors.BuildingNo.length > 0  ">
            <li class="error" v-for="(err , index) in errors.BuildingNo" :key="index">
                {{err}}
            </li>
        </ul>
        <v-text-field
            v-model="form.RowNo"
            :rules="rules.RowNo"
            label="Row"
            required
        ></v-text-field>
        <ul v-if="errors.RowNo && errors.RowNo.length > 0  ">
            <li class="error" v-for="(err , index) in errors.RowNo" :key="index">
                {{err}}
            </li>
        </ul>
        <v-text-field
            v-model="form.FlatNo"
            :rules="rules.FlatNo"
            label="Flat"
            required
        ></v-text-field>
        <ul v-if="errors.FlatNo && errors.FlatNo.length > 0  ">
            <li class="error" v-for="(err , index) in errors.FlatNo" :key="index">
                {{err}}
            </li>
        </ul>
        <v-text-field
            v-model="form.Street"
            :rules="rules.Street"
            label="Street"
            required
        ></v-text-field>
        <ul v-if="errors.Street && errors.Street.length > 0  ">
            <li class="error" v-for="(err , index) in errors.Street" :key="index">
                {{err}}
            </li>
        </ul>
        <v-text-field
            v-model="form.Remark"
            :rules="rules.Remark"
            label="Remark"
            required
        ></v-text-field>
        <ul v-if="errors.Remark && errors.Remark.length > 0  ">
            <li class="error" v-for="(err , index) in errors.Remark" :key="index">
                {{err}}
            </li>
        </ul>

        <v-select
        :items="sections"
        item-text="AreaName"
        item-value="id"
        @change="getAreas"
        label="section"
        ></v-select>

        <v-select
        v-show="areas.length > 0"
        :items="areas"
        v-model="form.AreaNo"
        item-text="AreaName"
        item-value="id"
        label="area"
        ></v-select>
        <ul v-if="errors.AreaNo && errors.AreaNo.length > 0  ">
            <li class="error" v-for="(err , index) in errors.AreaNo" :key="index">
                {{err}}
            </li>
        </ul>
        

        <v-select
        :items="$auth.user.user.phones"
        v-model="form.PhSerial"
        item-text="phone"
        item-value="id"
        label="phone"
        ></v-select>
        <ul v-if="errors.PhSerial && errors.PhSerial.length > 0  ">
            <li class="error" v-for="(err , index) in errors.PhSerial" :key="index">
                {{err}}
            </li>
        </ul>
        
        <v-btn
            color="primary"
            class="d-block"
            @click="create"
            :loading="loading"
        >
            Create
        </v-btn>
    </v-form>
       
</template>

<script>
import {mapGetters} from 'vuex'
import {form , rules , errors} from "@/utilities/address.js"
export default {
    computed : {
        ...mapGetters({
            sections: 'user/sections',
            areas: 'user/areas',
        }), 
    },
    data () {
      return {
        valid: false,
        loading: false,
        err : null,
        form ,
        errors ,
        rules ,
      }
    },
    methods:{
        getAreas(id){
            if(id){
                this.$store.dispatch('user/getAreas' , id)
                return
            }
            this.$store.dispatch('user/getSections')
            
        },
        create(){
            this.$refs.form.validate()
            if(this.valid){
                this.loading = true
                this.$store.dispatch('user/attachAddress', this.form)
                .then(()=>{
                    this.loading = false
                    this.$emit('created')
                    this.$store.commit('ui/mobileCreateAddressModal' , false)
                })
                .catch(e => {
                    if(typeof e == 'string'){
                        this.err = e
                    } else {
                        this.errors = e
                    }
                    this.loading = false
                });
            }
        },
    },
    created(){
        this.getAreas()
    }
  }
</script>