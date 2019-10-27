<template>

    <b-card no-body class="border-secondary">
        <b-card-body class="p-2">                
            <div class="font-weight-bold">
                {{ skill.showName() }}
            </div>
            <div class="small">
                [{{ $t('message.element') }}] : {{ skill.type.showName() }} 
                {{ skill.mp ? " [MP] : "+skill.mp : "" }} 
                {{ skill.point ? " ["+$t('message.inherit') +"] : "+skill.point : "" }}
            </div>
        </b-card-body>
        <b-card-footer class="p-2">
            <div class="small">{{ skill.showDesc() }}</div>
        </b-card-footer>
    </b-card>

</template>

<script>
export default {
    props:['skill'],
    data:function(){
        return {};
    }
}
</script>