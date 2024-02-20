import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

class D {
    // delegate（移譲）という名前の通り、プロパティへアクセスしたときの処理を別のオブジェクトに移譲している
    var date: MyDate by EffectiveDate()
}

class EffectiveDate<R> : ReadWriteProperty<R, MyDate> {

    var timeInMillis: Long? = null

    override fun getValue(thisRef: R, property: KProperty<*>): MyDate =
        timeInMillis!!.toDate()

    override fun setValue(thisRef: R, property: KProperty<*>, value: MyDate) {
        timeInMillis = value.toMillis()
    }
}

