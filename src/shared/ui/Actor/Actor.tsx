import React from 'react';
import styles from './Actor.module.css';

interface ActorProps {
  actor: {
    name: string;
    photo: string;
  };
}

const Actor: React.FC<ActorProps> = ({ actor }) => {
  return (
    <div className={styles.actor}>
      <img src={`${actor.photo}`} alt={actor.name} className={styles.photo} />
      <span className={styles.name}>{actor.name}</span>
    </div>
  );
};

export default Actor;
