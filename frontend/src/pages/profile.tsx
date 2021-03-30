import * as React from 'react'
import { LoggedinHeader } from '../components/shared/loggedin-header'
interface profileProps {

}

export const Profile: React.FC<profileProps> = ({}) => {
    return (
      <div>
        <LoggedinHeader />
        Profile
      </div>
    );
}