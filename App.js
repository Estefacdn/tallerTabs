import { StyleSheet, Text, View, TextInput, Switch, Picker, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react';

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
            cuenta = Math.floor(aleatorio);
            setNumeroCuenta(account);
            alert("Bienvenido(a) " + data.user);
            console.log("bienvenido(a): " + data.user);
            console.log('Llega Hasta ACA');
            navigation.navigate('Cuenta',  /* nombre: data.user, cuenta: numeroCuenta } */)

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
          /* pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){5,15}$/ */
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Contraseña"
            secureTextEntry={false}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='password'
      />
      {errors.password?.type == "required" && <Text style={{ color: 'red', fontSize: 15 }}>La contraseña es obligatoria</Text>}
      {/* {errors.password?.type == "pattern" && <Text style={{ color: 'red', fontSize: 15 }}>Debe tener numeros,letra minuscula y mayuscula,punto y caracter especial, sin espacios, maximo 15 caracteres</Text>} */}

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

  /* const { nombre, account } = route.params; */
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
    setVista(true);
    setDatosUsuario(data);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Numero de cuenta</Text>
      <View style={styles.inputs}>
        <TextInput style={styles.picker} /* placeholder={cuenta} */>
        </TextInput>
      </View>

      <Text>identificacion</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
          pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={[styles.inputs, {
            borderColor: errors.identification?.type == 'required' || errors.identification?.type == 'pattern' || errors.identification?.
              type == 'maxLength' || errors.identification?.type == 'minLength' ? 'red' : 'green'
          }]}

            placeholder="Identificacion"
            onChange={onChange}
            value={value}
            onBlur={onBlur}

          />
        )}
        name='identification'
      />


      <Text>Titular de cuenta</Text>
      <TextInput style={styles.inputs}
        placeholder="Titular de Cuentas"
      />
      <Text>Fecha</Text>
      <TextInput style={styles.inputs}
        placeholder="Fecha"
      />
      <Text>Saldo</Text>
      <TextInput style={styles.inputs}
        placeholder="Saldo"
      />

      <TouchableOpacity
        style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, marginTop: 10, width: 180 }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Iniciar Sesión</Text>
      </TouchableOpacity>

    </View>
  );
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
          tabBarStyle: { /* display: "none" */ },
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
  }
});