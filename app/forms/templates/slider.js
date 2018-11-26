import React from 'react'
import { Text, Slider, View, StyleSheet } from 'react-native'

export default sliderTemplate = (locals) => {
   const help = (
       <Text style={{marginBottom:8}}>{locals.help}</Text>
   );

   return(
       <View>
           <Text style={{fontWeight: 'bold', fontSize: 16}}>
           {locals.label} ({parseInt(locals.value)})
           </Text>
           <Slider
                ref='input'
                step={locals.config.step}
                minimumValue={locals.config.min}
                maximumValue={locals.config.max}
                value={parseInt(locals.value)}
                onValueChange={value => locals.onChange(value)}
            />
            {help}
       </View>
   )
}

const styles = StyleSheet.create({})
