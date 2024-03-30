<script>
import { Cookies } from 'quasar'

Cookies.remove('L3SDNUser')
Cookies.remove('L3SDNexpiration')
Cookies.remove('L3SDNtype')

document.location.href = '/login'
</script>
