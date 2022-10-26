import { StyleSheet, Text, View, TextInput, Switch, Picker, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'
import { useContext, useState } from 'react';

const Tab = createBottomTabNavigator();

function UserScreen({ navigation }) {
  const [role, setRol] = useState('admin');
  /* const [user, setUser] = useState(''); */
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      user: '',
      rol: '',
      password: ''

    }
  });

  const onSubmit = data => {
    console.log(data);
    /* navigation.navigate('Profile'); */
    console.log(role);

    const users = [
      { user: 'Sandro', rol: 'admin', password: 'Sa#1.' },
      { user: 'Linda', rol: 'user', password: 'Li#2.' },
    ]

    if (role == 'admin') {
      console.log('llego')
      let usersSearch = users.find(mem => (mem.user == data.user))
      if (usersSearch != undefined) {
        if (usersSearch.rol == 'admin') {
          if (usersSearch.password == data.password) {

            let aleatorio;
            let account;
            do {
              aleatorio = Math.random() * 2000000;
            } while (aleatorio < 1000000)
            account = Math.floor(aleatorio);
            /* setNumeroCuenta(account); */
            alert("Bienvenido(a) " + data.user);
            console.log("bienvenido(a): " + data.user);
            console.log('Llega Hasta ACA');
            navigation.navigate('Profile')

          }
          else {
            alert("por favor verifique su contraseña");
          }
        }
        else {
          alert(data.user + " tiene rol de usuario");
        }
      }
      else {
        alert("Verfique que su usuario y/o contraseñan sean correctos");
      };
    }
    else {
      alert("El usuario ingresado no tiene rol de administrador");
    }
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 12,
          minLength: 3,
          pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={[styles.inputs, {
            borderColor: errors.user?.type == 'required' || errors.user?.type == 'pattern' || errors.user?.
              type == 'maxLength' || errors.user?.type == 'minLength' ? 'red' : 'green'
          }]}

            placeholder="Usuario"
            onChange={onChange}
            value={value}
            onBlur={onBlur}

          />
        )}
        name='user'
      />

      {errors.user?.type == "required" && <Text style={{ color: 'red', fontSize: 15 }}>El Usuario es obligatorio</Text>}
      {errors.user?.type == "minLength" && <Text style={{ color: 'red', fontSize: 15 }}>El Usuario debe tener minimo 3 caracteres</Text>}
      {errors.user?.type == "maxLength" && <Text style={{ color: 'red', fontSize: 15 }}>El usuario debe tener maximo 12 caracteres</Text>}
      {errors.user?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>El nombre debe tener solo letras</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&])\S{4,12}$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='password'
      />
      {errors.password?.type == "required" && <Text style={{ color: 'red', fontSize: 15 }}>La contraseña es obligatoria</Text>}
      {errors.password?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>Debe tener numeros,letra minuscula y mayuscula,punto y caracter especial, sin espacios, maximo 15 caracteres</Text>}

      <Picker
        selectedValue={role}
        style={styles.pickerStyle}
        onValueChange={(itemValue, itemIndex) => setRol(itemValue)}
      >

        <Picker.Item label="Administrador" value="admin" />
        <Picker.Item label="Usuario" value="user" />

      </Picker>

      <TouchableOpacity
        style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, marginTop: 10, width: 180 }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Iniciar Sesión</Text>
      </TouchableOpacity>

    </View>
  );
}



function ProfileScreen({ navigation, route }) {

  /* const { name, account, estado, setEstado } = route.params; */
  const [datosUsuario, setDatosUsuario] = useState([]);
  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      account: '',
      identification: '',
      account_holder: '',
      date: '',
      balance: ''
    },
  });

  const onSubmit = data => {
    reset();
    setDatosUsuario(data);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Numero de cuenta</Text>
      <View style={styles.inputs}>
        <TextInput style={styles.picker} /* placeholder={account} */>
        </TextInput>
      </View>

      <Text>identificacion</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
          maxLength: 15,
          pattern: /^[0-9,$]*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.inputs, {
              borderColor: errors.identification?.type == 'required' || errors.identification?.type == 'pattern' || errors.identification?.type == 'maxLength' || errors.identification?.type == 'minLength' ? 'red' : 'green'
            }]}

            onChange={onChange}
            value={value}
            onBlur={onBlur}
            placeholder='ingrese Identificion'

          />
        )}
        name='identification'
      />
      {errors.identification?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>la identificacion debe ser solo numeros</Text>}
      {errors.identification?.type == "minLength" && <Text style={{ color: 'red', fontSize: 15 }}>Se permite maximo 12 numeros</Text>}

      <Text>Titular de cuenta</Text>
      <Controller
        control={control}
        rules={{
          required: "Campo obligatorio.",
          maxLength: { value: 100, message: "Se permite maximo 100 letras" },
          minLength: { value: 3, message: "Se permite minimo 3 letras" },
          pattern: {
            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/, message:
              "Solo se permiten letras",
          },
        }}

        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.inputs, { borderColor: errors.account_holder ? 'red' : 'green' }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese titular cuenta"
          />
        )}
        name="account_holder"
      />
      {errors.account_holder && <Text style={{ color: 'red', fontSize: 15 }}>{errors.account_holder.message}</Text>}

      <Text>Fecha</Text>
      <Controller
        control={control}
        rules={{
          required: "El fecha es obligatoria.",
          pattern: {
            value: /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/, message:
              "Formato mm/dd/yyyy",
          },
        }}

        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.inputs, { borderColor: errors.date ? 'red' : 'green' }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="MM/DD/YYYY"
          />
        )}
        name="date"
      />
      {errors.date && <Text style={{ color: 'red', fontSize: 15 }}>{errors.date.message}</Text>}


      <Text>Saldo</Text>
      <Controller
        control={control}
        rules={{
          required: "El saldo es obligatorio.",
          max: { value: 100000000, message: "Se permite maximo 100 millones" },
          min: { value: 1000000, message: "Se permite minimo 1 millon" },
          pattern: {
            value: /^[0-9]*$/, message:
              "Solo se permiten numeros",
          },
        }}

        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.inputs, { borderColor: errors.balance ? 'red' : 'green' }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese saldo"
          />
        )}
        name="balance"
      />
      {errors.balance && <Text style={{ color: 'red', fontSize: 15 }}>{errors.balance.message}</Text>}

      <TouchableOpacity
        style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, marginTop: 10, width: 180 }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Enviar</Text>
      </TouchableOpacity>


      <View style={{ marginTop: 7, backgroundColor: '#f5f5f5', borderRadius: 10, borderColor: 'green', borderWidth: 3 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 2 }}>INFORMACION DE LA CUENTA</Text>
        </View>
        <View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {/* <Text style={styles.datosUsuario}>Nro Cuenta: {account}</Text> */}
            <Text style={styles.datosUsuario}>Identificacion: {datosUsuario.identification}</Text>

            <Text style={styles.datosUsuario}>Fecha: {datosUsuario.date}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.datosUsuario}>Titular: {datosUsuario.account_holder}</Text>
            <Text style={styles.datosUsuario}>Saldo: {datosUsuario.balance}</Text>
          </View>
        </View>
      </View>

    </View>

  )
}
function AccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Pronto Estara Disponible, Disculpe las molestias</Text>
    </View>
  );
}



function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarStyle: {display: "none"},
          title: 'Inic.Sesion', tabBarIcon: ({ color, size }) => (
            <Ionicons name="body-outline" color={color} size={30} />
          )
        }}

      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Cuenta', tabBarIcon: ({ color, size }) => (
            <Ionicons name="key" color={color} size={30} />
          )
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Movimiento', tabBarIcon: ({ color, size }) => (
            <Ionicons name="repeat-outline" color={color} size={30} />
          )
        }}
      />

    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ title: 'Sistema Bancario' }} />
        {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 5
  },
  pickerStyle: {
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'green',
    padding: 9,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    width: 185,
    fontSize: 15,
  },
  datosUsuario: {
    marginLeft: 6,
    marginRight: 6,
    fontSize: 15,
    fontWeight: 1,
    padding: 3,
    flexDirection:'column',
  }
});